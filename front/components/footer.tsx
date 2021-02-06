import * as React from "react";

const Footer: React.FC = () => (
  <footer className="py-16 px-4">
    <div className="flex flex-col lg:flex-row items-center">
      <div className="w-full lg:w-auto lg:mr-auto text-center lg:text-left">©2021 pistatium</div>
      <div className="flex justify-center items-center space-x-6 mt-4 lg:mt-0">
        <a href="https://twitter.com/kimihiro_n" target="_blank" rel="noopener">
          <img src={'/images/logo-twitter.svg'} alt={'twitter'}
               className="text-indigo-600 w-6 h-6"/>
        </a>
        <a href="https://github.com/pistatium" target="_blank" rel="noopener">
          <img src={'/images/logo-github.svg'} alt={'GitHub'}
               className="text-indigo-600 w-6 h-6"/>
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
