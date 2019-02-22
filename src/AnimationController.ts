import { CharacterController } from "./CharacterController"

export class Animation {

    constructor(animationId: number, characterController: CharacterController) {

        const humanoid = characterController.getHumanoid()

        if (humanoid) {

            const animation = new Instance("Animation")
            animation.AnimationId = `rbxassetid://${animationId}`

            this.animationTrack = humanoid.LoadAnimation(animation)

        }

    }

    play() {

        if (this.animationTrack) {

            this.animationTrack.Play()

        }
        
    }

    stop() {

        if (this.animationTrack) {

            this.animationTrack.Stop()

        }

    }

    animationTrack: AnimationTrack | undefined

}

export class AnimationController {

    constructor(characterController: CharacterController) {

        this.characterController = characterController
        this.animations = []

    }

    loadAnimation(animationId: number): Animation {

        const animation = new Animation(animationId, this.characterController)
        this.animations.push(animation)

        return animation

    }

    getAnimatable() {

        return this.animatable

    }

    setAnimatable(animatable: boolean) {

        this.animatable = animatable

        this.animations.forEach(animation => {

            const animationTrack = animation.animationTrack

            if (animationTrack) {
                
                if (animatable) {

                    animationTrack.AdjustSpeed(1)

                } else {

                    animationTrack.AdjustSpeed(0)

                }

            }
            
        })

    }

    private characterController: CharacterController
    private animations: Array<Animation>
    private animatable = true

}