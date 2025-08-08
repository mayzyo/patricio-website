import { Component, input, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-editable-list',
    imports: [CommonModule],
    templateUrl: './editable-list.component.html',
    styleUrl: './editable-list.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: EditableListComponent
        }
    ]
})
export class EditableListComponent implements ControlValueAccessor {
    name = input<string>('');
    id = input<string>('');
    placeholder = input<string>('');

    value = input<string[]>();
    protected _value = signal(new Array<string>());

    protected onChange = (arr: string[]) => { };
    protected onTouched = () => { };
    protected disabled = signal(false);
    protected touched = signal(false);
    protected editedValue = '';

    protected onRemove(item: string): void {
        this.markAsTouched();

        if (!this.disabled()) {
            this._value.update(prev => {
                const newValue = prev.filter(el => el != item);
                this.onChange(newValue);
                return newValue;
            });
        }
    }

    protected onAdd(event: Event, inputElement: HTMLInputElement): void {
        const newValue = (event.target as HTMLInputElement).value;
        this.markAsTouched();

        if (!this.disabled() && newValue && !this._value().includes(newValue)) {
            // Necessary because Angular binding ignores changing value to ''.
            // So we have to set it directly on the native element.
            inputElement.value = '';
            this.editedValue = '';
            this._value.update(prev => {
                const arr = [...prev, newValue];
                this.onChange(arr);
                return arr;
            });
        }
    }

    protected markAsTouched() {
        if (!this.touched()) {
            this.touched.set(true);
            this.onTouched();
        }
    }

    writeValue(arr: string[]): void {
        this._value.set(arr);
    }

    registerOnChange(onChange: (arr: string[]) => {}): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: () => {}): void {
        this.onTouched = onTouched;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }
}
