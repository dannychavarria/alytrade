import React from 'react'
import { createUseStyles } from 'react-jss'
import Colors from '../../constants/colors.json'
const useStyle = createUseStyles({
    triangleUp: {
        width: 0,
        height: 0,
        right:"50px",
        position:"relative",
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderBottom: "10px solid #900",
        marginBottom: "10px"

    },
    menuContainer: {
        top: "110px",
        right: "10px",
        display: "flex",
        width: "200px",
        flexDirection: 'column',
        //borderRadius: '12px',
        background: "transparent",
        position: 'absolute',
        //padding: "10px",
        //border: `1px solid ${Colors.sideBarBg}`,
        ' & strong': {
            '&:hover': {
                background: Colors.tableBodyTextColor,
                cursor: 'pointer'
            }
        }
    },
    band: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: 'grey'
    },
    bandLeft: {
        display: 'flex',
        flexDirection: 'column'
    },
    bandRight: {
        display: 'flex',

    },
    optionsMenu: {
        marginTop: "20px",
        display: 'flex',
        flexDirection: 'column'
    }
})

const UserMenu = () => {
    const style = useStyle()
    return (<div className={style.menuContainer}>
        <div style={{ display: 'flex', width: "100%",justifyContent: "flex-end" }}>
            <div className={style.triangleUp} />
        </div>
        <div className={style.band}>
            <div className={style.bandLeft}>
                <strong>Username</strong>
                <button>+ Inversion</button>

            </div>
            <div className={style.bandRight}>
                <strong>image</strong>
            </div>
        </div>
        <div className={style.optionsMenu}>
            <button>Perfil</button>
            <button>Cerra sesion</button>
        </div>
    </div>)
}
export default UserMenu