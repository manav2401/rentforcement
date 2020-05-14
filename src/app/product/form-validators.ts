import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";

export function formValidator(control: AbstractControl): { [key: string]: any} | null {

    //console.log("Validator Function" + control.value + " " + control.value.length);
    if(control.value.length > 20){
        return {"error" : true};
    }
    else{
        return {"error": false};
    }

}   

export function formValidatorIsNumeric(control: AbstractControl): { [key: string]: any} | null {
    if(isNaN(Number(control.value) )){
        return { "error": true };
    }
    else{
        return null;    
        
    }
}

export function updateDurationValidator(currentDuration: number ): ValidatorFn {

    return(control: AbstractControl): { [key: string]: any } | null => {
        if(control.value < currentDuration){
            return { "durationError": true };
        }
        else{
            return null;
        }
    } 

}