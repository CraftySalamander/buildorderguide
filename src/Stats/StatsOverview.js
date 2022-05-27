import { useUserAuth } from '../Auth/Auth'
import { useEffect, useState } from 'react'
import DatabaseService from '../DatabaseService'
import Sidebar from '../UI/Sidebar'
import StatsInfoService from './StatsInfoService'
import MatchCard from './MatchCard'
import RatingsGraph from './RatingsGraph'
import GameDurationsView from './GameDurationView'
import CivPerformanceChart from './CivPerformanceChart'
import CivPerformanceTable from './CivPerformanceTable'

const StatsOverview = (props) => {
    const { user, logOut } = useUserAuth()
    const [profileId, setProfileId] = useState('')
    const [gameMode, setGameMode] = useState('Random Map')
    const [error, setError] = useState(undefined)
    const [ratings, setRatings] = useState(undefined)
    const [matches, setMatches] = useState(undefined)
    const [civStats, setCivStats] = useState(undefined)
    const [durationStats, setDurationStats] = useState(undefined)

    useEffect(() => {
        DatabaseService.loadProfileInfo(user).then(userData => {
            setProfileId(userData.profile_id)
            loadMatches(userData.profile_id)
        })
    }, [user])

    const loadMatches = (id) => {
        if (id === undefined || id === null) return
        const matchType = gameMode === 'Random Map' ? '1v1' : 'team'

        fetch('https://us-central1-build-order-guide.cloudfunctions.net/getRatings?ranked=true&mode=RM&type=' + matchType + '&profile_id=' + id)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error !== undefined) {
                    setError(true)
                } else {
                    const ratingsData = StatsInfoService.prepareRatingsData(responseJson)
                    setRatings(ratingsData)
                }
            }).catch((error) => {
                console.log(`Couldn't load ratings: ${error}`)
                setError(true)
            })

        fetch('https://us-central1-build-order-guide.cloudfunctions.net/getMatches?ranked=true&mode=RM&type=' + matchType + '&profile_id=' + id)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error !== undefined) {
                    setError(true)
                } else {
                    const stats = StatsInfoService.getStatsForPlayer(responseJson, id)
                    setMatches(responseJson)
                    setCivStats(stats.civs)
                    setDurationStats(stats.durations)
                }
            }).catch((error) => {
                console.log(`Couldn't load matches: ${error}`)
                setError(true)
            })
    }

    return (
        <div class='text-center'>
            <Sidebar />
            <p class='my-12 text-4xl'>1v1 Random Map Stats</p>
            {ratings !== undefined && <div class='w-1/2 h-96 mx-auto my-12'><RatingsGraph data={ratings}/></div>}
            <p class='my-12'>Showing data for your last 1,000 matches.</p>
            {durationStats !== undefined && <GameDurationsView data={durationStats}/>}
            {civStats !== undefined && <div class='w-1/2 h-96 mx-auto my-12'><CivPerformanceChart data={civStats} /></div>}
            {civStats !== undefined && <div class='w-1/2 mx-auto my-12'><CivPerformanceTable data={civStats} /></div>}
            {(gameMode === 'Random Map' && matches !== undefined) && matches.map(match => ( // TODO: adapt match cards for team games
                 <MatchCard match={match} profile_id={profileId} />
            ))}
        </div>
    )
}

export default StatsOverview