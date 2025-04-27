package edu.neu.csye7374.designpattern.factory;

import edu.neu.csye7374.designpattern.command.Communication;

public abstract class AbstractFactoryAPI {
    /**
     * Returns an object
     */
    public abstract Communication getObject();
}