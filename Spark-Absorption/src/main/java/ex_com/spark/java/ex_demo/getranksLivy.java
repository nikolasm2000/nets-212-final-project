package ex_com.spark.java.ex_demo;


import java.util.concurrent.ExecutionException;
import java.net.URISyntaxException;
import java.io.File;
import java.io.IOException;

import java.net.URI;
import org.apache.livy.LivyClient;
import org.apache.livy.LivyClientBuilder;

public class getranksLivy {
	
	public static void main(String[] args) throws IOException, URISyntaxException, InterruptedException, ExecutionException{ 
		LivyClient client = new LivyClientBuilder()
				.setURI(new URI("http://ec2-3-237-31-86.compute-1.amazonaws.com:8998/"))
				.build();
		try {
			String jar = "target/original-ex-demo-1.0-SNAPSHOT.jar";
			System.out.printf("Uploading %s to the Spark context ....\n", jar);
			client.uploadJar(new File(jar)).get();
			
			System.out.printf("running reccomendations", jar);
			
			//finalOne = client.submit(new App()).get();
			
			System.out.printf("successfully ran", jar);
			
		} catch (NullPointerException n) {
			System.out.printf("Null pointer caught");
		} finally {
			System.out.printf("Null pointer caught");
			client.stop(true);
		}
	}
}
