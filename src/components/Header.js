import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div>
                    <h1>
                        <a href="/">
                            IHC
                        </a>
                    </h1>
                </div>
            </header>
        )
    }
}
export default Header