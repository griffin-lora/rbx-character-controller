import { RunService } from "rbx-services"

export class MovementController {

    constructor(character: Model) {
        
        const primaryPart = character.PrimaryPart

        this.primaryPart = primaryPart
        this.humanoid = character.FindFirstChildWhichIsA("Humanoid") as Humanoid | undefined

        let last = tick()

        RunService.Stepped.Connect(() => {

            let current = tick()
            let delta = current - last
            last = current

            if (delta <= 1 && this.mobile) {
                
                const velocityCframe = new CFrame(primaryPart.Position.add(this.velocity.mul(delta))).mul(primaryPart.CFrame.sub(primaryPart.Position))

                character.SetPrimaryPartCFrame(velocityCframe)

            }

        })

    }

    // Humanoid only methods

    bounce(height: number) {

        if (this.humanoid) {

            this.humanoid.JumpPower = height
            this.humanoid.ChangeState(Enum.HumanoidStateType.Jumping)

        }

    }

    move(position: Vector3) {

        if (this.humanoid) {

            this.humanoid.Move(position)

        }

    }

    isMoving() {

        if (this.humanoid) {

            return (this.humanoid.MoveDirection !== new Vector3())

        }
        
    }
    
    isGrounded() {

        if (this.humanoid) {

            return (this.humanoid.FloorMaterial !== Enum.Material.Air)

        }

    }

    humanoidStateChanged(event: Function): RBXScriptConnection {

        if (this.humanoid) {

            return this.humanoid.StateChanged.Connect((humanoidState: Enum.HumanoidStateType) => {

                event(humanoidState)

            })

        } else {

            return new Instance("BindableEvent").Event.Connect(() => {

                

            })

        }

    }

    landed(event: Function): RBXScriptConnection {

        return this.humanoidStateChanged((humanoidState: Enum.HumanoidStateType) => {

            if (humanoidState === Enum.HumanoidStateType.Landed) {

                event()

            }

        })

    }

    velocity = new Vector3()
    mobile = true

    primaryPart: BasePart
    humanoid: Humanoid | undefined

}