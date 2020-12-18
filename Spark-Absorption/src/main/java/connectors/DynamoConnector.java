package connectors;


import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.auth.SystemPropertiesCredentialsProvider;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;


/**
 * A factory 
 * @author zives
 *
 */
public class DynamoConnector {
	
	

	/**
	 * This is our connection
	 */
	static DynamoDB client;

	/**
	 * Singleton pattern: get the client connection if one exists, else create one
	 * 
	 * @param url
	 * @return
	 */
	public static DynamoDB getConnection(final String url) {
		client = new DynamoDB( 
	    			AmazonDynamoDBClientBuilder.standard()
					.withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(
							"https://dynamodb.us-east-1.amazonaws.com", "us-east-1"))
        			.withCredentials(new EnvironmentVariableCredentialsProvider())
					.build());
    	return client;
	}
	
	/**
	 * Orderly shutdown
	 */
	public static void shutdown() {
		if (client != null) {
			client.shutdown();
			client = null;
		}
	}
}
