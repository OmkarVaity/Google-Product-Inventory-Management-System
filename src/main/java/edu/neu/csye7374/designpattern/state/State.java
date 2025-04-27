package edu.neu.csye7374.designpattern.state;

public class State {

    private StateAPI state;

    public State() {
        state = null;
    }

    public StateAPI getState() {
        return state;
    }

    public void setState(StateAPI state) {
        this.state = state;
    }


}