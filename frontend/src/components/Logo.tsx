import { NavLink } from 'react-router-dom'
import logoImage from '../assets/logo.webp'
import { cn } from '@/lib/utils'
import { useTheme } from '@/context/themeProvider'


const Logo: React.FC = () => {
    const { theme } = useTheme()
    return (
        <NavLink to='/' className="">
            <img src={logoImage} alt="logo" className={cn('h-10', theme === 'dark' ? 'invert' : 'invert-0')} />
        </NavLink>
    )
}

export default Logo