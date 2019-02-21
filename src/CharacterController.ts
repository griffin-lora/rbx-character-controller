import { StateController, State } from "./StateController"
import { MovementController } from "./MovementController"
import { Players } from "rbx-services"
const player = Players.LocalPlayer as Player
const playerScripts = player.WaitForChild("PlayerScripts") as PlayerScripts

interface ControlModule {

    Enable: (controlModule: ControlModule) => void
    Disable: (controlModule: ControlModule) => void

}

export { State } from "./StateController"

export class CharacterController {

    constructor(character: Model) {
        
        if (!character.PrimaryPart) {

            error("No primaryPart found on the character.")

        }
        
        spawn(() => {
  
            if (!game.IsLoaded) {
                
                game.Loaded.Wait()

            }

            if (playerScripts.FindFirstChild("PlayerModule") && playerScripts.WaitForChild("PlayerModule").FindFirstChild("ControlModule")) {
    
                const controlModule = require(playerScripts.WaitForChild("PlayerModule").WaitForChild("ControlModule") as ModuleScript) as ControlModule
                controlModule.Disable(controlModule)
    
            }

        })

        player.Character = character
        this.character = character
        this.movementController = new MovementController(character)
        this.stateController = new StateController()

    }

    // MovementController

    getVelocity() {

        return this.movementController.velocity

    }

    setVelocity(velocity: Vector3) {

        this.movementController.velocity = velocity

    }

    getMobile() {

        return this.movementController.mobile

    }

    setMobile(mobile: boolean) {

        this.movementController.mobile = mobile

    }

    // Humanoid only methods

    bounce(height: number) {

        this.movementController.bounce(height)

    }

    move(position: Vector3) {

        this.movementController.move(position)

    }

    isGrounded() {

        return this.movementController.isGrounded()

    }

    isMoving() {

        return this.movementController.isMoving()

    }

    humanoidStateChanged(event: Function): RBXScriptConnection {

        return this.movementController.humanoidStateChanged(event)

    }

    landed(event: Function): RBXScriptConnection {

        return this.movementController.landed(event)

    }

    getPrimaryPart() {

        return this.movementController.primaryPart
        
    }

    getHumanoid() {

        return this.movementController.humanoid
        
    }

    // StateController

    addState(state: typeof State) {
        
        this.stateController.addState(state)

    }

    addStates(states: Array<typeof State>) {
        
        this.stateController.addStates(states)

    }

    setState(stateName: string) {

        this.stateController.setState(stateName)

    }

    getState() {

        return this.stateController.getState()

    }

    // Properties

    character: Model
    movementController: MovementController
    stateController: StateController

}