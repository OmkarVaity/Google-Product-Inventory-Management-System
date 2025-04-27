package edu.neu.csye7374.designpattern.state;

import edu.neu.csye7374.designpattern.state.State;
public abstract class StateAPI {

    /**
     * Performs the action of sending an alert to the server and updating
     * @param state
     */
    public abstract void action(State state, int stock);

}