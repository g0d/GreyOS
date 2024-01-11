var my_armadillo = new armadillo();
var new_rec_1 = {
                    "name"       :       "George",
                    "surname"    :       "Delaportas",
                    "address"    :       "1337 Hackers Ave.",
                    "company"    :       "X-TEK",
                    "user"       :       "gdelaportas"
                };
var new_rec_2 = {
                    "name"       :       "John",
                    "surname"    :       "Sanders",
                    "address"    :       "22 Telco Beavers Ave.",
                    "company"    :       "Ultima Blockchain",
                    "user"       :       "jsanders"
                };

console.log('Reset storage: ' + my_armadillo.reset());

console.log('DB set: ' + my_armadillo.db.set('New DB'));
console.log('DB use: ' + my_armadillo.db.use('New DB'));

console.log('Record 1 inserted: ' + my_armadillo.records.insert(new_rec_1));
console.log('Record 2 inserted: ' + my_armadillo.records.insert(new_rec_2));

console.log('Records fetched: ');
console.log(my_armadillo.records.fetch());

console.log('Record selected: ');
console.log(my_armadillo.records.select(my_armadillo.records.fetch()[1].id));

new_rec_1.surname = 'Smith';
console.log('Record saved: ' + my_armadillo.records.save(new_rec_1));
console.log('Record deleted: ' + my_armadillo.records.delete(new_rec_2.id));
console.log('DB get: ');
console.log(my_armadillo.db.get('New DB'));

console.log('Records cleared: ' + my_armadillo.records.clear());
console.log('DB remove: ' + my_armadillo.db.remove('New DB'));
