import BackgroundImage from "./components/BackgroundImage";
import HeroText from "./components/heroText";
import Container from "./layout/container";
import Section from "./layout/section";
import Navbar from "./navbar/navbar";
const App = () => {
    return (
        <>
            <Navbar />
            <BackgroundImage>
                <HeroText />
            </BackgroundImage>
            <Container>
                <Section>
                    <></>
                </Section>
            </Container>
        </>
    );
};
export default App;
