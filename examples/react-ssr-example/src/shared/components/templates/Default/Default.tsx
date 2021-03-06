import { RenderRoutes } from "@shared/components";
import { RouteComponentProps } from "@shared/router";
import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Icon, Responsive, Segment } from "semantic-ui-react";
import { MainMenu, MenuItem } from "../../molecules";

class Default extends React.PureComponent<RouteComponentProps> {
    public render(): React.ReactNode {
        const { routes, match } = this.props;
        const items: MenuItem[] = [
            { name: "Home", path: "/", active: true },
            { name: "Blog", path: "/blog", active: false },
        ];
        items.forEach((item, index) => {
            items[index].active = match.isExact
                ? match.path === item.path
                : match.path.startsWith(item.path);
        });
        return (
            <Responsive>
                <Container fluid={true}>
                    <MainMenu as={Link} items={items} fixed={false} />
                </Container>
                <Container fluid={true}>
                    {routes && <RenderRoutes routes={routes} />}
                </Container>
                <Container fluid={true}>
                    <Segment inverted={true} vertical={true} textAlign="center">
                        <p>
                            Powered with <Icon name="heart" /> by PixelOven
                        </p>
                    </Segment>
                </Container>
            </Responsive>
        );
    }
}

export default Default;
