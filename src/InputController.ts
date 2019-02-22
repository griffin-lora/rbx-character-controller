import { UserInputService, Workspace, RunService } from "rbx-services"
const camera = Workspace.WaitForChild("Camera") as Camera

// CURRENTLY IN DEVELOPMENT

export abstract class InputController {
    
    static jumped(event: Function) {

        UserInputService.InputBegan.Connect(input => {

            if (input.KeyCode === Enum.KeyCode.Space || input.KeyCode === Enum.KeyCode.ButtonA) {

                event()

            }

        })

    }

    static moved(event: Function) {

        RunService.Stepped.Connect(() => {

            let moveDirection = new Vector3()

            if (UserInputService.IsKeyDown(Enum.KeyCode.W)) {

                moveDirection = moveDirection.add(camera.CFrame.LookVector)

            }

            if (UserInputService.IsKeyDown(Enum.KeyCode.S)) {

                moveDirection = moveDirection.sub(camera.CFrame.LookVector)

            }

            if (UserInputService.IsKeyDown(Enum.KeyCode.D)) {

                moveDirection = moveDirection.add(camera.CFrame.RightVector)

            }

            if (UserInputService.IsKeyDown(Enum.KeyCode.A)) {

                moveDirection = moveDirection.sub(camera.CFrame.RightVector)

            }

            event(moveDirection)

        })

    }

    static crouched(event: Function) {

        UserInputService.InputBegan.Connect(input => {

            if (input.KeyCode === Enum.KeyCode.LeftShift || input.KeyCode === Enum.KeyCode.ButtonL2) {

                event()

            }

        })

    }

}