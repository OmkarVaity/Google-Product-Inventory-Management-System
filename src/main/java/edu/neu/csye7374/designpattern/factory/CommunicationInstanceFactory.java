package edu.neu.csye7374.designpattern.factory;

import edu.neu.csye7374.designpattern.command.Communication;

// Implementing Lazy Factory Pattern
public class CommunicationInstanceFactory extends AbstractFactoryAPI{

    private static Communication comm;
    @Override
    public Communication getObject() {

        if(comm == null) {
            comm = new 	Communication();
        }
        return comm;
    }

}