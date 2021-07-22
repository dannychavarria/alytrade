import React from 'react'
import { createUseStyles } from 'react-jss'
import Colors from '../../constants/colors.json'
import whatsapp from '../../assets/img/whatsapp.svg'
import cerrar from '../../assets/img/cerrar.svg'
import { FiSettings } from 'react-icons/fi';
import CharacterCanvas from '../Dashboard/CharacterCanvas'
const useStyle = createUseStyles({
    triangleUp: {
        width: 0,
        height: 0,
        right:"54px",
        position:"relative",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        borderBottom: "10px solid #63747E",
    },
    menuContainer: {
        top: "110px",
        right: "10px",
        display: "flex",
        width: "200px",
        flexDirection: 'column',
        background: "transparent",
        position: 'absolute',
    },
    band: {
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: '#63747E',
        padding: "10px"
    },
    bandLeft: {
        display: 'flex',
        flexDirection: 'column',
        '& strong':{
            margin: "5px",
            color:'white',
            '&[title="button"]':{
                borderRadius: "10px",
                padding: "5px",
                fontSize: "12px",
                background: "#062131",
                cursor:'pointer'
            }    
        }
    },
    bandRight: {
        display: 'flex',
    },
    optionsMenu: {
        padding: "10px",
        display: 'flex',
        flexDirection: 'column',
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        background: '#253D4B',
        '& strong':{
            padding: "5px",
            color:'white',
        },
        '& p':{
            margin: "10px",
            display: "flex",
            justifyContent: 'left',
            alignItems: 'center',
            '&:hover': {
                background: Colors.tableBodyTextColor,
                cursor: 'pointer'
            }
        }
    }
})

const UserMenu = ({username}) => {
    const style = useStyle()
    return (<div className={style.menuContainer}>
        <div style={{ display: 'flex', width: "100%",justifyContent: "flex-end" }}>
            <div className={style.triangleUp} />
        </div>
        <div className={style.band}>
            <div className={style.bandLeft}>
                <strong>{username}</strong>
                <strong title="button">+ Nueva Inversion</strong>

            </div>
            <div className={style.bandRight}>
                <CharacterCanvas letra={username.charAt(0).toUpperCase()}/>
            </div>
        </div>
        <div className={style.optionsMenu}>
            <p><FiSettings size={25}/><strong>Configuración</strong></p>
            <p><img height="25" width="25" src={whatsapp}></img><strong>Soporte</strong></p>
            <p><img height="25" width="25" src={cerrar}></img> <strong>Cerrar sesión</strong></p>
        </div>
    </div>)
}
export default UserMenu
