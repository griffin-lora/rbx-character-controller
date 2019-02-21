# rbx-character-controller

# NOTE: The is currently a bug that occasionally causes ControlModule to be active. In the meantime you should disable ControlModule.

# Example
```ts
import { CharacterController, State } from "rbx-character-controller"

const characterController = new CharacterController(character)

const states = new Array<typeof State>()

class Jump extends State {

    static id = "Jump"

    static check() {
        
        UserInputService.InputBegan.Connect(input => {

            if (input.KeyCode === Enum.KeyCode.Space) {

                if (characterController.isGrounded()) {

                    characterController.setState("Jump")
    
                }

            }

        })

    }

    static start() {

        characterController.bounce(50)

        const connection = characterController.landed(() => {

            connection.Disconnect()

            if (characterController.getState() === "Jump") {

                characterController.setState("None")

            }

        })

    }

    static stop() {

        

    }

}
states.push(Jump)

characterController.addStates(states)
```