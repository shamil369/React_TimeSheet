import bcrypt from 'bcrypt'


const roberPassword = bcrypt.hashSync("robert123",10);
console.log(roberPassword)

// $2b$10$umkedRtd8HHEPsqQEIyuZeXuwjfeyioCX5UBYHyyyN1yN9FiWT15i

const passOk = bcrypt.compareSync("robert123","$2b$10$cLtgbocxLzf15ZWTIqzOg.ITn3sN3LuJPM.5gyzGDNjI2ygYvMN8y")

console.log(passOk)