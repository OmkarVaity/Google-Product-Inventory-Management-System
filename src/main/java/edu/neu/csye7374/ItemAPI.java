package edu.neu.csye7374;

public class ItemAPI implements Cloneable{

	    private int price, id;
	    private String name;

	    public ItemAPI() {
	        super();
	    }
	    
	    public ItemAPI(String name, int id , int price) {
	    	this.name = name;
	    	this.id = id;
	    	this.price = price;
	    }
	    
		public int getPrice() {
			return price;
		}

		public void setPrice(int price) {
			this.price = price;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

	    public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public Object clone() {
			Object clone = null;
			
			try {
				clone  = super.clone();
			} catch (CloneNotSupportedException cloneException) {
				cloneException.printStackTrace();
			}
			
			return clone;
			
		}
}