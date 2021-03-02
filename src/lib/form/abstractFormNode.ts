/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormManager } from "./formManager";

type ControlValue = string | Record<string, AbstractFormNode>;

/**
 * This is the base class for `FieldManager`, and `FieldManager`.  It represents a node in the form tree of depth 1.
 */
export abstract class AbstractFormNode {
  protected _value: any;

  /**
   * A node is `pristine` if the user has not edited this node within the form.
   *
   * This is the case if the user has not submitted form data to the server to be validated.
   */
  protected pristine = true;

  private _parent: FormManager = null;

  constructor(value: ControlValue) {
    this._value = value;
  }

  /**
   * @param parent {FormManager}   Sets the parent form maanger
   */
  setParent(parent: FormManager): void {
    this._parent = parent;
  }

  /**
   * Getter for the field manager.
   */
  public get parent(): FormManager {
    return this._parent;
  }

  /**
   * Marks the control as `dirty`.
   */
  public markAsDirty(): void {
    this.pristine = false;
  }
}
