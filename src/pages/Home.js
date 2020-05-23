import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './page.module.sass'

const currentHour = new Date().getHours()

const greetingMessage =
    currentHour >= 4 && currentHour < 12 ? // after 4:00AM and before 12:00PM
        'Good morning' :
        currentHour >= 12 && currentHour <= 17 ? // after 12:00PM and before 6:00pm
            'Good afternoon' :
            currentHour > 17 || currentHour < 4 ? // after 5:59pm or before 4:00AM (to accommodate night owls)
                'Good evening' : // if for some reason the calculation didn't work
                'Welcome'

class Home extends Component {
    render() {
        return (
            <div>
                <h1>{greetingMessage}!</h1>
                <p>Nothing to see here...</p>
                {/* <Link to="/logs"  className="button button--primary button--link button--rounded button--has-shadow button--has-icon">Open Logs <span>&rarr;</span></Link> */}
            </div>
        )
    }
}
export default Home