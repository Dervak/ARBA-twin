import Wrapper from "../Wrapper"
import WeatherWidget from "./WeatherWidget"
import Chat from "../Chat/Chat"
import ReactGridLayout from "react-grid-layout"

const MainUserPage = () => {
    const windowWidth = window.innerWidth
    return (
        <Wrapper title="Pagina Inicial | ARBA">
            {/* <ReactGridLayout
                className="layout"
                cols={15}
                rowHeight={80}
                compactType={null}
                width={windowWidth}
                margin={[25, 25]}
                isBounded={true}
                autoSize={false}
            > */}
            <Chat />
            <div>
                <WeatherWidget />
            </div>
            {/* </ReactGridLayout> */}
        </Wrapper>
    )
}

export default MainUserPage