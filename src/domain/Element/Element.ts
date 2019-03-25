import uuid from './../utils/uuid';
import { Boundary } from './../geometry/Boundary';
import ElementKind from './../plugins/ElementKind';
import { RelationshipKind } from '../Relationship';
import { UMLElement } from '../..';

export interface IElement {
  readonly id: string;
  readonly name: string;
  readonly type: ElementKind | RelationshipKind;
  readonly bounds: Boundary;
  readonly owner: string | null;

  hovered: boolean;
  selected: boolean;
  interactive: boolean;
}

export abstract class Element implements IElement {
  static features = {
    hoverable: true,
    selectable: true,
    movable: true,
    resizable: 'BOTH' as 'BOTH' | 'WIDTH' | 'HEIGHT' | 'NONE',
    connectable: true,
    editable: true,
    interactable: true,
  };

  readonly id: string = uuid();
  public name: string = '';
  abstract readonly type: ElementKind | RelationshipKind;
  readonly bounds: Boundary = new Boundary(0, 0, 200, 100);
  owner: string | null = null;

  hovered: boolean = false;
  selected: boolean = false;
  interactive: boolean = false;

  constructor(values?: UMLElement);
  constructor(values?: Partial<IElement>);
  constructor(values?: UMLElement | Partial<IElement>) {
    Object.assign(this, values);
  }

  toUMLElement(
    element: Element,
    children: Element[]
  ): { element: UMLElement; children: Element[] } {
    return {
      element: {
        id: element.id,
        name: element.name,
        owner: element.owner,
        type: element.type as ElementKind,
        bounds: element.bounds,
      },
      children: children,
    };
  }
}
