interface wizard {
    id: number;
    name: string;
    house: string;
}  

type NewWizard =Omit<wizard,"id">;

const wizards: wizard[]=[];

function addWizard(data:NewWizard):wizard{
    const id=wizards.length+1;

    const wizard: wizard={

        id:id,
        name:data.name,
        house:data.house
    }
    wizards.push(wizard);
    return wizard;
}
const wizard1 = addWizard({
    name: "Harry Potter",
    house: "Gryffindor"
  });
  
  const wizard2 = addWizard({
    name: "Hermione Granger",
    house: "Gryffindor"
  });

  console.log(wizards);