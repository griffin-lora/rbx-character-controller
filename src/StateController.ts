import { CharacterController } from "./CharacterController"

export class State {

    static id = "Default"

    static init(characterController: CharacterController) {

        warn(`Default init method is being used on ${this.id}.`)

    }

    static start(characterController: CharacterController) {

        warn(`Default start method is being used on ${this.id}.`)

    }

    static stop(characterController: CharacterController) {

        warn(`Default stop method is being used on ${this.id}.`)

    }

}

interface States {

    [key: string]: typeof State

}

export class StateController {

    constructor(characterController: CharacterController) {

        this.characterController = characterController
        this.states = {} as States
        this.stateObject = State

    }

    addState(state: typeof State) {
        
        state.init(this.characterController)
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
                
                previousState.stop(this.characterController)

            }

            this.stateObject = state
            state.start(this.characterController)

        } else {

            error(`${stateName} is not a valid state.`)

        }

    }

    getState() {

        return this.stateObject.id

    }
    
    private characterController: CharacterController
    private states: States
    private stateObject: typeof State

}