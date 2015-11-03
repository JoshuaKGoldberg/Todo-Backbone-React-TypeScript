/// <reference path="react-global.d.ts" />

declare namespace ReactDOM {
    import ClassicComponent = React.ClassicComponent;
    import ClassicElement = React.ClassicElement;
    import Component = React.Component;
    import DOMComponent = React.DOMComponent;
    import DOMElement = React.DOMElement;
    import ReactElement = React.ReactElement;

    function findDOMNode<TElement extends Element>(
        componentOrElement: Component<any, any> | Element): TElement;
    function findDOMNode(
        componentOrElement: Component<any, any> | Element): Element;

    function render<P>(
        element: DOMElement<P>,
        container: Element,
        callback?: () => any): DOMComponent<P>;
    function render<P, S>(
        element: ClassicElement<P>,
        container: Element,
        callback?: () => any): ClassicComponent<P, S>;
    function render<P, S>(
        element: ReactElement<P>,
        container: Element,
        callback?: () => any): Component<P, S>;
}