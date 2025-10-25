import React from 'react';
import Typewriter from 'typewriter-effect';

function TypewriterText() {
  return (
    <div className="text-base md:text-xl text-zinc-700 dark:text-zinc-300 h-6 font-medium">
      <Typewriter
        options={{
          strings: [
            "Google Ads Consultant",
            "Imprenditore",
            "Formatore",
            "Google Premier Partner"
          ],
          autoStart: true,
          loop: true,
          delay: 55,
          deleteSpeed: 30
        }}
      />
    </div>
  );
}

export default TypewriterText;
