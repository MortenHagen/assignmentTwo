class Medicine {
    constructor(name, id, manufacturer, expirationDate, quantity) {
        this.name = name;
        this.id = id;
        this.manufacturer = manufacturer;
        this.expirationDate = expirationDate;
        this.quantity = quantity;
    }
}

class PharmacyInventory {
    constructor() {
        this.medicines = this.loadMedicinesFromStorage();
    }

    loadMedicinesFromStorage() {
        try {
            const storedMedicines = JSON.parse(localStorage.getItem('medicines')) || [];
            return storedMedicines;
        } catch (error) {
            console.error('Error loading medicines from storage:', error);
            return [];
        }
    }

    saveMedicinesToStorage() {
        localStorage.setItem('medicines', JSON.stringify(this.medicines));
    }

    addMedicine(medicine) {
        this.medicines.push(medicine);
        this.saveMedicinesToStorage();
    }

    deleteMedicine(id) {
        this.medicines = this.medicines.filter(medicine => medicine.id !== id);
        this.saveMedicinesToStorage();
    }

    displayMedicines() {
        const medicineList = document.getElementById('medicineList');
        medicineList.innerHTML = '';

        this.medicines.forEach(medicine => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.escapeHTML(medicine.name)}</td>
                <td>${this.escapeHTML(medicine.id)}</td>
                <td>${this.escapeHTML(medicine.manufacturer)}</td>
                <td>${this.escapeHTML(medicine.expirationDate)}</td>
                <td>${this.escapeHTML(medicine.quantity)}</td>
                <td><button data-id="${medicine.id}" class="delete-btn">Delete</button></td>
            `;
            medicineList.appendChild(row);
        });
    }

    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

class UniqueIDPharmacyInventory extends PharmacyInventory {
    constructor() {
        super();
        this.idSet = new Set(this.medicines.map(medicine => medicine.id));
    }

    addMedicine(medicine) {
        if (this.idSet.has(medicine.id)) {
            alert("Product ID must be unique.");
            return;
        }
        super.addMedicine(medicine);
        this.idSet.add(medicine.id);
    }
}

const pharmacyInventory = new UniqueIDPharmacyInventory();

document.addEventListener('DOMContentLoaded', () => {
    const medicineForm = document.getElementById('medicineForm');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    medicineForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const productName = document.getElementById('productName').value;
        const productId = document.getElementById('productId').value;
        const manufacturer = document.getElementById('manufacturer').value;
        const expirationDate = document.getElementById('expirationDate').value;
        const quantity = document.getElementById('quantity').value;

        // Form validation
        if (!productName || !productId || !manufacturer || !expirationDate || !quantity) {
            alert("All fields are mandatory.");
            return;
        }

        // Create a new Medicine object
        const newMedicine = new Medicine(productName, productId, manufacturer, expirationDate, quantity);

        // Add the medicine to the inventory
        pharmacyInventory.addMedicine(newMedicine);

        // Display medicines
        pharmacyInventory.displayMedicines();
        
        // Clear form inputs
        medicineForm.reset();
    });

    // Delete button event delegation
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const medicineId = event.target.dataset.id;
            pharmacyInventory.deleteMedicine(medicineId);
            pharmacyInventory.displayMedicines();
        }
    });

    pharmacyInventory.displayMedicines();
});
