import BackgroundImage from "./components/BackgroundImage";
import Container from "./layout/container";
import Section from "./layout/section";
import Navbar from "./navbar/navbar";
const App = () => {
    return (
        <>
            <Navbar />
            <BackgroundImage />
            <Container>
                <Section>
                    <></>
                </Section>
            </Container>
        </>
    );
};
export default App;
