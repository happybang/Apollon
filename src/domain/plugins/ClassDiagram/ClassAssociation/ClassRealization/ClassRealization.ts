import ClassAssociation from '../ClassAssociation';
import { RelationshipKind, UMLClassAssociation } from '../..';
import { Element } from '../../../../../services/element';

class ClassRealization extends ClassAssociation {
  type = RelationshipKind.ClassRealization;

  static toUMLRelationship(
    relationship: ClassAssociation
  ): UMLClassAssociation {
    return ClassAssociation.toUMLRelationship(relationship);
  }

  static fromUMLRelationship(
    umlRelationship: UMLClassAssociation,
    elements: Element[]
  ): ClassAssociation {
    return ClassAssociation.fromUMLRelationship(umlRelationship, elements);
  }
}

export default ClassRealization;
