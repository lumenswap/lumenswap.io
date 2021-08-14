import useBreakpoint from 'use-breakpoint';

// const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };
const BREAKPOINTS = {
  mobile: 0, sm: 576, md: 768, lg: 992, xl: 1200,
};

function useMyBreakpoint() {
  const myBreakpoint = useBreakpoint(BREAKPOINTS, 'mobile');

  const deviceSize = {
    sm: myBreakpoint.breakpoint === 'sm', md: myBreakpoint.breakpoint === 'md', lg: myBreakpoint.breakpoint === 'lg', mobile: myBreakpoint.breakpoint === 'mobile', xl: myBreakpoint.breakpoint === 'xl',
  };

  return { ...myBreakpoint, deviceSize };
}

export default useMyBreakpoint;
