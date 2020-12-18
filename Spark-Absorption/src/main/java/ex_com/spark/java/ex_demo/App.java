package ex_com.spark.java.ex_demo;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.HashSet;
import java.util.Iterator;

import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.types.StructType;
import org.apache.commons.net.nntp.Article;
import org.apache.spark.SparkContext;


import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.ItemCollection;
import com.amazonaws.services.dynamodbv2.document.ScanOutcome;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.ScanSpec;
import com.amazonaws.services.dynamodbv2.model.AttributeDefinition;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.KeySchemaElement;
import com.amazonaws.services.dynamodbv2.model.KeyType;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import com.amazonaws.services.dynamodbv2.model.ResourceInUseException;
import com.amazonaws.services.dynamodbv2.model.ScalarAttributeType;
import com.amazonaws.services.dynamodbv2.model.ScanRequest;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;

import opennlp.tools.stemmer.PorterStemmer;
import opennlp.tools.stemmer.Stemmer;

import connectors.SparkConnector;
import connectors.DynamoConnector;
import scala.Tuple2;

public class App 
{	
	DynamoDB db;
	Table articles;
	Table inverted;
	Table categories;
	Table finalweights;
	Table friends;
	Table UserInterests;
	Table NewsLikes;
	
	JavaRDD<String> users;
	
	Stemmer stemmer;
	private HashSet<String> stopwords;
	
		
	static SparkSession spark;
	static JavaSparkContext context;
	static JavaPairRDD<String, Long> finalRDD;

	
	public void initialize() throws IOException, InterruptedException {
		System.out.println("Connecting...");
		spark = SparkConnector.getSparkConnection();
		context = SparkConnector.getSparkContext();
		System.out.println("Connected...");
		db = DynamoConnector.getConnection("https://dynamodb.us-east-1.amazonaws.com");
		System.out.println("CHECK THIS " + db);
		System.out.println("DynamoDb connected ...");
		
		articles = db.getTable("pb_articles");
		inverted = db.getTable("pb_inverteds");
		categories = db.getTable("pb_interests");
		finalweights = db.getTable("pb_finalweights");
		friends = db.getTable("pb_friends");
		UserInterests = db.getTable("pb_userinterests");
		NewsLikes = db.getTable("pb_newslikes");
		
		stemmer = new PorterStemmer();
		stopwords = new HashSet<String>();
		Scanner sc = null;
		try {
			sc = new Scanner (new File("stopwords.txt"));
		} catch (FileNotFoundException e){
			e.printStackTrace();
		}
		while(sc.hasNext()) {
			String s = sc.next().toLowerCase().trim();
			if (s != null) {
				stopwords.add(s);
			}
		}
	}
	
	
	//should return (C, A, weight) (A, C, weight). The sum of these weights = 1. 
	//need to add the scan function for the categories table. 
	//C + id for categories. A + id for articles.
	public JavaPairRDD<String, Tuple2<String, Double>> getArticles() throws IOException, InterruptedException {
		System.out.println("get articles is hit");
		List<scala.Tuple2<String, String>> listwithoutRanks = new ArrayList<scala.Tuple2<String, String>>();
		ScanSpec scanSpec = new ScanSpec().withProjectionExpression("articleID, category, articleDate");	
		try {
			ItemCollection<ScanOutcome> items = articles.scan(scanSpec);
			Iterator<Item> iter = items.iterator();
			while(iter.hasNext()) {
				Item item = iter.next();
				LocalDate articleDate =  LocalDate.parse((String)item.get("articleDate"));
				if (articleDate.isBefore(LocalDate.now()) || articleDate.equals(LocalDate.now())) {
					String articleID = "a/" + item.get("articleID").toString();
					String category = "c/" + item.get("category").toString();
					System.out.println("articleID is " + articleID);
					System.out.println("category is " + category);
					Tuple2<String, String> toAdd = new Tuple2<String, String>(articleID, category);
					Tuple2<String, String> toAdd2 = new Tuple2<String, String>(category, articleID);
					listwithoutRanks.add(toAdd);
					listwithoutRanks.add(toAdd2);
				}
			}
		} 
		catch (Exception e) {
			System.err.println("Unable to scan the table.");
			System.err.println(e.getMessage());
		}
		JavaPairRDD<String, String> edges = context.parallelizePairs(listwithoutRanks);
		JavaPairRDD<String, Double> ranks = edges
				.mapToPair(row -> new Tuple2<String, Double> (row._1, 1.0))
				.reduceByKey((a,b) -> a+b)
				.mapToPair(row -> new Tuple2<String, Double> (row._1, 1/row._2));		
		
		JavaPairRDD<String, Tuple2<String, Double>> finalRDD = edges.join(ranks);
		return finalRDD;
	}
	
	//naming convention: add u before ID for users. returns (u, u', weight).
	public JavaPairRDD<String, Tuple2<String, Double>> getFriends() throws IOException, InterruptedException {
		System.out.println("get friends is hit");
		List<scala.Tuple2<String, String>> listwithoutRanks = new ArrayList<scala.Tuple2<String, String>>();
		ScanSpec scanSpec = new ScanSpec().withProjectionExpression("PBuser, friend");	
		try {
			ItemCollection<ScanOutcome> items = friends.scan(scanSpec);
			Iterator<Item> iter = items.iterator();
			while(iter.hasNext()) {
				Item item = iter.next();
				String from = "u/" + item.get("PBuser").toString();
				String to = "u/" + item.get("friend").toString();
				System.out.println("from is " + from);
				System.out.println("to is " + to);
				Tuple2<String, String> toAdd = new Tuple2<String, String> (from, to);
				Tuple2<String, String> toAdd2 = new Tuple2<String, String> (to, from);
				listwithoutRanks.add(toAdd);
				listwithoutRanks.add(toAdd2);
			}
		} catch (Exception e) {
			System.err.println("Unable to scan the table.");
			System.err.println(e.getMessage());
		}
		JavaPairRDD<String, String> edges = context.parallelizePairs(listwithoutRanks);
		JavaPairRDD<String, Double> ranks = edges
				.mapToPair(row -> new Tuple2<String, Double> (row._1, 1.0))
				.reduceByKey((a,b) -> a+b)
				.mapToPair(row -> new Tuple2<String, Double> (row._1, 0.3/row._2));	
		
		JavaPairRDD<String, Tuple2<String, Double>> finalRDD = edges.join(ranks);
		return finalRDD;
	}

	
	
//	 (U, C) (C, U). Add u before userID. add C before categoryID.
//	to implement From the UserInterests table and the Categories Table. 
//	returns a pairRDD: (from, to, weight). The weights should sum to 0.3.
	public JavaPairRDD<String, Tuple2<String, Double>> getInterests() throws IOException, InterruptedException {
		List<scala.Tuple2<String, String>> listwithCategoryID = new ArrayList<scala.Tuple2<String, String>>();
		System.out.println("get interest is hit");
		ScanSpec scanSpec = new ScanSpec().withProjectionExpression("PBuser, item_id");	
		try {
			ItemCollection<ScanOutcome> items = UserInterests.scan(scanSpec);
			System.out.println("hello");
			Iterator<Item> iter = items.iterator();
			while(iter.hasNext()) {
				Item item = iter.next();
				String user = "u/" + item.get("PBuser").toString();
				String categoryID =  item.get("item_id").toString();
				System.out.println("user is " + user);
				try {
					Item categoryItem = categories.getItem("id", categoryID);
					String categoryName = "c/" + categoryItem.get("name").toString();
					System.out.println("category is " + categoryName);
					Tuple2<String, String> toAdd = new Tuple2<String, String> (user, categoryName);
					Tuple2<String, String> toAdd2 = new Tuple2<String, String> (categoryName, user);
					listwithCategoryID.add(toAdd);
					listwithCategoryID.add(toAdd2);
				} catch (Exception e) {
					System.err.println("error getting category");
					System.err.println(e.getMessage());
				}
			}
		} catch (Exception e) {
			System.err.println("Unable to scan the table.");
			System.err.println(e.getMessage());
		} 
		JavaPairRDD<String, String> edges = context.parallelizePairs(listwithCategoryID);
		JavaPairRDD<String, Double> ranks = edges
				.mapToPair(row -> new Tuple2<String, Double>(row._1, 1.0))
				.reduceByKey((a,b) -> a+b)
				.mapToPair(row -> new Tuple2<String, Double>(row._1, 0.3/row._2));
		JavaPairRDD<String, Tuple2<String, Double>> finalRDD = edges.join(ranks);
		return finalRDD;
	}
	
	//(U,A) (A,U). 
	//to implement from the reactions table. 
	//returns a pairRDD: (from, to, weight). The weights should sum to 0.4.
	public JavaPairRDD<String, Tuple2<String, Double>> getLikedArticles() throws IOException, InterruptedException {
		System.out.println("get liked articles is hit");
		List<scala.Tuple2<String, String>> listwithoutRanks = new ArrayList<scala.Tuple2<String, String>>();
		ScanSpec scanSpec = new ScanSpec().withProjectionExpression("news, author");
		try {
			ItemCollection<ScanOutcome> items = NewsLikes.scan(scanSpec);
			Iterator<Item> iter = items.iterator();
			while(iter.hasNext()) {
				Item item = iter.next();
				String user = "u/" + item.get("author");
				String article = "a/" + item.get("news");
				System.out.println("user is " + user);
				System.out.println("articles is " + article);
				Tuple2<String, String> toAdd = new Tuple2<String, String> (user, article);
				Tuple2<String, String> toAdd2 = new Tuple2<String, String> (article, user);
				listwithoutRanks.add(toAdd);
				listwithoutRanks.add(toAdd2);
			}
		} catch (Exception e) {
			System.err.println("Unable to scan the table.");
			System.err.println(e.getMessage());
		}
		JavaPairRDD<String, String> edges = context.parallelizePairs(listwithoutRanks);
		JavaPairRDD<String, Double> ranks = edges
				.mapToPair(row -> new Tuple2<String, Double>(row._1, 1.0))
				.reduceByKey((a,b) -> a+b)
				.mapToPair(row -> new Tuple2<String, Double>(row._1, 0.4/row._2));
		JavaPairRDD<String, Tuple2<String, Double>> finalRDD = edges.join(ranks);
		
		return finalRDD;
	}
	
	//graph withOUT label nodes. 
	public JavaPairRDD<String, Tuple2<String, Double>> graphwithoutLabels() throws IOException, InterruptedException {
		System.out.println("graph called");
		JavaPairRDD<String, Tuple2<String, Double>> toR = getInterests().union(getFriends());
		toR = toR.union(getArticles());
		toR = toR.union(getLikedArticles());
		System.out.println("graph made");
		return toR;
	}
	
	//GETS all nodes NOT INCLUDING THE LABEl NODES!!!
	public JavaRDD<String> nodesNoLabels() throws IOException, InterruptedException {
		JavaPairRDD<String, Tuple2<String, Double>> interGraph = graphwithoutLabels();
		JavaRDD<String> allNodes = interGraph.map(row -> row._1).distinct();
		return allNodes;
	}
	
	//ALL THE USER NODES.
	public JavaRDD<String> getUsers() throws IOException, InterruptedException {
		JavaRDD<String> users = getInterests().map(row -> row._1)
				.filter(row -> row.charAt(0) == 'u');
		users = users.distinct();
		System.out.println("users is " + users.collect().toString());
		return users;
	}
	
	//MAKES ALL THE LABEL NODES.
	public JavaRDD<String> getLabels() throws IOException, InterruptedException {
		JavaRDD<String> users = getUsers();
		JavaRDD<String> label = users.map(row -> "l/" + row.substring(2,row.length()));
		System.out.println("labels is " + label.collect().toString());
		return label;
	}

	//creates an edge from LABEL TO USER AND SETS ITS WEIGHT TO 1. This is for the actual social network graph. 
	public JavaPairRDD<String, Tuple2<String, Double>> labeltoUser() throws IOException, InterruptedException {
		JavaRDD<String> users = getUsers();
		JavaPairRDD<String, Tuple2<String, Double>> labeltoUser = users.mapToPair(row -> {
			String label = "l/" + row.substring(2, row.length());
			Tuple2<String, Double> first = new Tuple2<String, Double> (row, 1.0);
			Tuple2<String, Tuple2<String, Double>> toR = new Tuple2<String, Tuple2<String, Double>> (label, first);
			return toR;
		});
		System.out.println((labeltoUser.collect().toString()));
		return labeltoUser;
	}
	
	//(LABELNode, LABEL, 1) This is for the distribution graph.
	public JavaPairRDD<String, Tuple2<String, Double>> getDistribution() throws IOException, InterruptedException {
		System.out.println("distribition is hit");
		JavaRDD<String> label = getLabels();
		JavaPairRDD<String, Double> labelOne = label.mapToPair(row -> new Tuple2<String, Double>(row, 1.0));
		JavaPairRDD<String, Tuple2<String, Double>> toR = labelOne
				.mapToPair(row-> new Tuple2<String, Tuple2<String, Double>> (row._1, row));
		System.out.println(toR.collect().toString());
		return toR;
	}
	
	
	//FINAL GRAPH. INCLUDES EDGE FROM LABEL TO USER NODE. THIS DOES NOT CHANGE!!! THE WEIGHTS ON THIS ARE FIXED.
	public JavaPairRDD<String, Tuple2<String, Double>> makefinalGraph() throws IOException, InterruptedException {
		JavaPairRDD<String, Tuple2<String, Double>> finalGraph = graphwithoutLabels().union(labeltoUser());
		System.out.println(finalGraph.collect().toString());
		return finalGraph;	
	}
	
	//GETS ALL THE NODES INCLUDING THE LABELS.
	public JavaRDD<String> getallNodes() throws IOException, InterruptedException {
		JavaPairRDD<String, Tuple2<String, Double>> finalGraph = makefinalGraph();
		JavaRDD<String> allNodes = finalGraph.map(row -> row._1).distinct();
		return allNodes;
	}

	
	
	//returns a pairRDD of (User, Article, RANK)!!! -- this goes into the DB.
	public JavaPairRDD<String, Tuple2<String, Double>> runAbsorption() throws IOException, InterruptedException {
		JavaPairRDD<String, Tuple2<String, Double>> finalGraph = makefinalGraph();
		JavaPairRDD<String, Tuple2<String, Double>> distribution = getDistribution();
		System.out.println("absorption is hit");
		for (int i = 0;  i < 5; i++) {
			System.out.println("iterating");
			JavaPairRDD<String, Tuple2<String, Double>> newDistribution = finalGraph.join(distribution)
				.mapToPair(row -> {
					double edgeWeight = row._2._1._2;
					double labelWeight = row._2._2._2;
					double newWeight = edgeWeight * labelWeight;
					String vertex = row._2._1._1;
					String label = row._2._2._1;
					Tuple2<String, Double> labelWeightRDD = new Tuple2<String, Double> (label, newWeight);
					Tuple2<String, Tuple2<String, Double>> finalTuple = new Tuple2<String, Tuple2<String, Double>> (vertex, labelWeightRDD);
					return finalTuple;	
			});
			
			JavaPairRDD<String, Double> fractions = newDistribution.mapToPair(row -> new Tuple2<String, Double> (row._1, row._2._2))
				.reduceByKey((a,b) -> a + b)
				.mapToPair(row -> new Tuple2<String, Double>(row._1, 1.0/row._2));
					
			newDistribution = newDistribution.join(fractions)
					.mapToPair(row -> {
						Double prevRank = row._2._1._2;
						Double scaleFactor = row._2._2;
						Double newrank = prevRank * scaleFactor;
						String label = row._2._1._1;
						Tuple2<String, Double> labelnewWeight = new Tuple2<String, Double> (label, newrank);
						Tuple2<String, Tuple2<String, Double>> toR = new Tuple2<String, Tuple2<String, Double>> (row._1, labelnewWeight);
						return toR;						
					});
			distribution = newDistribution;
		};
		distribution = distribution.filter(row -> row._1.substring(0, 1).equals("a"));
		return distribution;
	}
	
	
	public void uploadGraph() throws IOException, InterruptedException {
		System.out.println("upload graph is hit");
		JavaPairRDD<String, Tuple2<String, Double>> finalAbsorbed = runAbsorption();
		finalAbsorbed = finalAbsorbed.mapToPair(row -> {
			String label = row._2._1;
			String user = label.substring(2,label.length());
			System.out.println("FINAL USER" + user);
			String article = row._1.substring(2, row._1.length());
			System.out.println("article USER" + article);
			double weight = row._2._2;
			System.out.println("weight");

			Tuple2<String, Double> pairOne = new Tuple2<String, Double> (article, weight);
			Tuple2<String, Tuple2<String, Double>> toR = new Tuple2<String, Tuple2<String, Double>> (user, pairOne);
			return toR;
		});
		System.out.println("finalAbsorbed is " + finalAbsorbed.toString());
		
		finalAbsorbed.foreach(row -> {
			try {
				final App app = new App();
				app.initialize();
				Item adder = new Item ()
						.withPrimaryKey("PBuser", row._1, "article", row._2._1)
						.withNumber("weight", row._2._2);
				app.finalweights.putItem(adder);
				System.out.println("working!!");
			} catch (Exception e) {
				System.err.println("Error adding");
				System.err.println(e);
			}
		});
	}
	

	//for each category (c, u) (c, a). Count the total number of outgoing edges. Sum of weights on all outgoing edges = 1.
	//for each article (a, c) (a, u). Count the total number of outgoing edges. Sum of weights on all outgoing edges = 1.
	//for each user u. sum of weights on edges (u, c) = 0.3. sum of weight on edges (u, a) = 0.4. sum of weights of (u, u')  = 0.3.
	
	//Each node MUST have a userlabel + weight. 
	
	//(userID, weight),
	
//	private boolean allWords(String s) {
//		char[] charcArr = s.toCharArray();
//		for (Character c : charcArr) {
//			if (!Character.isLetter(c)) {
//				return false;
//			}
//		}
//		return true;
//	}
//		

	
//	public void loadData(String[] args) throws IOException, InterruptedException {
//		System.out.println("Running...");
//		JavaRDD<String> lines = context.textFile("news_data.json"); 
//		JavaRDD<String> categories = lines.map(row -> {
//			JsonParser jsonParser = new JsonParser();
//			JsonObject jo = (JsonObject) jsonParser.parse(row);
//			String x = jo.get("category").toString().trim().toLowerCase();
//			x = x.substring(1, x.length()-1);
//			return x;
//		});
//		categories = categories.distinct();
//		System.out.println(categories.collect().toString());
//
//		JavaPairRDD<String, Long> categoryID = categories.zipWithUniqueId();
////		JavaPairRDD<Long, String> finalCategory = categoryID.mapToPair(row -> new Tuple2<Long, String>(row._2, row._1));
////		finalCategory.foreach(row ->{
////			try {
////				final App app = new App();
////				app.initialize();
////				Item adder = new Item()
////						.withPrimaryKey("id", Long.toString(row._1))
////						.withString("name", row._2);
////				app.categories.putItem(adder);
////			} catch (Exception e) {
////				System.err.println("Error adding");
////				System.err.println(e);
////			}
////		});
//		finalRDD = lines.zipWithUniqueId();
//		finalRDD.foreach(row -> {
//			String toParse = row._1.toLowerCase();
//			JsonParser jsonParser = new JsonParser();
//			JsonObject jo = (JsonObject) jsonParser.parse(toParse);
//			
//			String withQuote = jo.get("date").toString().trim();
//			String without = withQuote.substring(1, withQuote.length()-1);
//			LocalDate date = LocalDate.parse(without);
//			LocalDate afterDate = date.plusYears(4);
//			if (afterDate.isBefore(LocalDate.parse("2021-01-01"))) {
//				String dateNew = afterDate.toString();
//				
//				String category = jo.get("category").toString().trim();
//				category = category.substring(1, category.length()-1);
//					
//				String authors = jo.get("authors").toString().trim();
//				authors = authors.substring(1, authors.length()-1);
//				
//				String headline = jo.get("headline").toString().trim();
//				headline = headline.substring(1, headline.length()-1);
//				
//				String link = jo.get("link").toString().trim();
//				link = link.substring(1, link.length()-1);
//				
//				String shortd = jo.get("short_description").toString().trim();
//				shortd = shortd.substring(1, shortd.length()-1);
//				
//				int articleID = row._2.intValue();
//							
//				try {
//					final App app = new App();
//					app.initialize();
//					Item adder = new Item()
//							.withPrimaryKey("articleID", Integer.toString(articleID))
//							.withString("category", category)
//							.withString("authors", authors)
//							.withString("headline", headline)
//							.withString("link", link)
//							.withString("short_description", shortd)
//							.withString("articleDate", dateNew);
//					app.articles.putItem(adder);
//					String [] head = headline.split("\\s+");
//					for (String x : head) {
//						if (!app.stopwords.contains(x)) {
//							if (!app.allWords(x)){
//								continue;
//							}
//							x = (String) app.stemmer.stem(x);
//							Item inverted = new Item()
//									.withPrimaryKey("keyword", x, "id", Integer.toString(articleID))
//									.withBoolean("article", true)
//									.withString("obj_id", Integer.toString(articleID));
//							app.inverted.putItem(inverted);
//						}
//					}
//					System.out.println("added successfully");
//				} catch (Exception e) {
//					System.err.println("Error adding");
//					System.err.println(e);
//				}
//			}
//		});	
//	}
//		
	public void shutdown() {
		System.out.println("Shutting down");

		if (spark != null)
			spark.close();
	}
	
    public static void main( String[] args ) {
    	final App cr = new App();
		try {
			cr.initialize();
			cr.uploadGraph();
		} catch (final IOException ie) {
			System.out.println("I/O error: ");
			ie.printStackTrace();
		} catch (final InterruptedException e) {
			e.printStackTrace();
		} finally {
			cr.shutdown();
		}
    };
}

