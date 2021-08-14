import useBreakpoint from 'use-breakpoint';

// const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };
const BREAKPOINTS = {
  mobile: 0, sm: 576, md: 768, lg: 992, xl: 1200,
};

function useMyBreakpoint() {
  return useBreakpoint(BREAKPOINTS, 'mobile');
}

export default useMyBreakpoint;
