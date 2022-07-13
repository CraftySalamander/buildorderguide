import Button from '../UI/Button.js'
import BuildData from './BuildData.js'

const FocusChoiceView = (props) => {
    return (
        <div class='flex flex-col my-8 md:my-52'>
            {BuildData.getListOfChoicesForBuild(props.build).map((item) => (
                <Button onClick={() => props.goToFocusModeStep(item.step + 1)}>{BuildData.getShortTitleForDecisionStep(item.text)}</Button>
            ))}
        </div>
    )
}

export default FocusChoiceView