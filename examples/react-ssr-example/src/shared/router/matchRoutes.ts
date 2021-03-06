import { RouteProps } from "@shared/router";
import { match, matchPath } from "react-router";

interface MatchedRoutes {
    matched: match;
    route: RouteProps;
}

/**
 * Copied form Router.computeRootMatch(pathname) version 4.4.0-beta
 * Type definitions don't cover this and not available in the version of react router we use
 * @param pathname
 */
const computeRootMatch = (pathname: string): match => {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
};

const matchRoutes = (
    routes: RouteProps[],
    pathname: string,
    matches: MatchedRoutes[] = [],
) => {
    routes.forEach(route => {
        const matched = route.path
            ? matchPath(pathname, route)
            : matches.length
            ? matches[matches.length - 1].matched // use parent match
            : computeRootMatch(pathname); // use default "root" match

        if (matched) {
            matches.push({ route, matched });
            if (route.routes) {
                matchRoutes(route.routes, pathname, matches);
            }
        }
        return matched;
    });
    return matches;
};

export default matchRoutes;
