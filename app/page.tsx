"use client";
import BackgroundImage from "./components/BackgroundImage";
import HeroText from "./components/heroText";
import FooterPart1 from "./components/mainPart/footer";
import Part1 from "./components/mainPart/part1";
import Part2 from "./components/mainPart/part2";
import Part3 from "./components/mainPart/part3";
import Part4 from "./components/mainPart/part4";
import Part5 from "./components/mainPart/part5";
import Part6 from "./components/mainPart/part6";
import Navbar from "./navbar/navbar";
const App = () => {
    return (
        <>
            <Navbar />
            <BackgroundImage>
                <HeroText />
            </BackgroundImage>
            <Part1></Part1>
            <Part2></Part2>
            <Part3></Part3>
            <Part4></Part4>
            <Part5></Part5>
            <Part6></Part6>
            <FooterPart1></FooterPart1>
        </>
    );
};
export default App;
