'use client';

import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypeIntro = () => {
    return (
        <TypeAnimation
            className="text-2xl tracking-widest md:text-5xl"
            sequence={[500, ' An Open Source Enthusiast', 1000, 'A Web <Developer />', 1000]}
            speed={10}
            repeat={Infinity}
        />
    );
};
export default TypeIntro;
