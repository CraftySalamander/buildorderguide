import { Link } from 'react-router-dom'
import AttributesView from './AttributesView'
import DifficultyIndicator from './DifficultyIndicator'
import PopIndicator from './PopIndicator'

const BuildPreviewCard = (props) => {

    const isOfficialBuild = (publisher) => publisher === 'nOuk4lquYrXt4H2xafiZpPUFvN82' // Everything that is published by this Id is a verified build currently

    return (
        <Link to={{ pathname: `/build/${props.build.id}` }}>
            <div class='overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 relative w-11/12 max-w-sm mt-10 mx-auto bg-white shadow-xl cursor-pointer rounded-2xl'>

                {isOfficialBuild(props.build.publisher) === false && <div class='absolute transform rotate-45 bg-gray-400 text-center text-white font-semibold py-1 right-[-34px] top-[32px] w-[170px]'>
                    Community
                </div>}

                <h1 class='m-5 text-xl font-bold overflow-clip h-7'>{props.build.title}</h1>
                <h3 class='ml-5 pb-5 -mt-5 text-md font-bold text-gray-400'>{props.build.author}</h3>

                <div class='grid overflow-hidden grid-cols-4 grid-rows-4 gap-0'>
                    <div class='box row-start-2 row-span-4 w-24'>
                        {props.build.imageURL !== null && props.build.imageURL !== undefined && <img class='h-24 w-24' src={props.build.imageURL} alt={props.build.title} />}
                        {props.build.imageURL === null || props.build.imageURL === undefined && <img class='h-24 w-24' src={require('../Images/BuildImagePlaceholder.png')} alt={props.build.title} />}
                    </div>
                    <div class='col-start-2 col-span-3 ml-8'>
                        <PopIndicator pop={props.build.pop} />
                    </div>
                    <div class='col-start-2 col-span-3 ml-8'>
                        <AttributesView attributes={props.build.attributes} />
                    </div>
                    <div class='col-start-2 col-span-3 ml-8'>
                        <DifficultyIndicator difficulty={props.build.difficulty} />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BuildPreviewCard