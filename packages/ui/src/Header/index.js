import React from 'react'
import styles from './Header.module.css'

const Index = (
    {
        title = "Multi-Zone App",
        showNavigation = true,
        currentZone = "main",
        className = ""
    }) => {
    const navigationLinks = [
        {href: '/', label: 'Home', zone: 'main'},
        {href: '/blog', label: 'Blog', zone: 'blog'},
        {href: '/dashboard', label: 'Dashboard', zone: 'dashboard'},
    ]

    return (
        <header className={`${styles.header} ${className}`}>
            <div className={styles.container}>
                {/* Logo/Title */}
                <div className={styles.brand}>
                    <a href="/" className={styles.brandLink}>
                        <h1 className={styles.title}>{title}</h1>
                    </a>
                </div>

                {/* Navigation */}
                {showNavigation && (
                    <nav className={styles.navigation}>
                        <ul className={styles.navList}>
                            {navigationLinks.map((link) => (
                                <li key={link.href} className={styles.navItem}>
                                    <a
                                        href={link.href}
                                        className={`${styles.navLink} ${
                                            currentZone === link.zone ? styles.active : ''
                                        }`}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}

                {/* Zone Indicator */}
                <div className={styles.zoneIndicator}>
                    <span className={styles.zoneBadge}>
                        {currentZone.charAt(0).toUpperCase() + currentZone.slice(1)} Zone
                    </span>
                </div>
            </div>
        </header>
    )
}

export default Index
