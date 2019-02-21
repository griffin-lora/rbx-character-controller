import { CharacterController } from "CharacterController"

export class State {

    static id = "Default"

    static check() {

        warn(`Default check method is being used on ${this.id}.`)

    }

    static start() {

        warn(`Default start method is being used on ${this.id}.`)

    }

    static stop() {

        warn(`Default stop method is being used on ${this.id}.`)

    }

}

interface States {

    [key: string]: typeof State

}

export class StateController {

    constructor() {

        this.states = {} as States

        this.stateObject = State

    }

    addState(state: typeof State) {
        
        state.check()
        this.states[state.id] = state

    }

    addStates(states: Array<typeof State>) {

        states.forEach(state => {

            this.addState(state)

        })

    }

    setState(stateName: string) {
        
        const state = this.states[stateName]
        if (state) {

            const previousState = this.stateObject
            if (previousState) {
                
                previousState.stop()

            }

            this.stateObject = state
            state.start()

        } else {

            error(`${stateName} is not a valid state.`)

        }

    }

    getState() {

        return this.stateObject.id

    }

    states: States

    stateObject: typeof State

}