"use client";
import BackgroundImage from "./components/BackgroundImage";
import HeroText from "./components/heroText";
import Part1 from "./components/mainPart/part1";
import Part2 from "./components/mainPart/part2";
import Part3 from "./components/mainPart/part3";
import Part4 from "./components/mainPart/part4";
import Part5 from "./components/mainPart/part5";
import Part6 from "./components/mainPart/part6";
const App = () => {
    return (
        <>
            <BackgroundImage>
                <HeroText />
            </BackgroundImage>
            <Part1></Part1>
            <Part2></Part2>
            <Part3></Part3>
            <Part4></Part4>
            <Part5></Part5>
            <Part6></Part6>
        </>
    );
};
export default App;
