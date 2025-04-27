package edu.neu.csye7374.designpattern.strategy;

public class InventoryStrategy {

	private StrategyAPI strategy;

	public InventoryStrategy(StrategyAPI strategy) {
		this.strategy = strategy;
	}
	
	public void executeAdd() {
		strategy.add();
	}
	
	public void executeDelete() {
		strategy.delete();
	}
	
	public void executeUpdate() {
		strategy.update();
	}
}
