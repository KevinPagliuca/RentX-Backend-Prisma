import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCars/CreateCarController';
import { DeleteCarController } from '@modules/cars/useCases/deleteCar/DeleteCarController';
import { ListAllCarsByAdminController } from '@modules/cars/useCases/listAllCarsByAdmin/ListAllCarsByAdminController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { ListCarByIdController } from '@modules/cars/useCases/listCarById/ListCarByIdController';
import { UpdateCarController } from '@modules/cars/useCases/updateCar/UpdateCarController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const listCarByIdController = new ListCarByIdController();
const listAllCarsByAdminController = new ListAllCarsByAdminController();

const updateCarController = new UpdateCarController();
const deleteCarController = new DeleteCarController();

const carsRoutes = Router();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.get('/:id', listCarByIdController.handle);
carsRoutes.put('/:id', updateCarController.handle);
carsRoutes.delete('/:id', deleteCarController.handle);

carsRoutes.get(
  '/list/all',
  ensureAuthenticated,
  ensureAdmin,
  listAllCarsByAdminController.handle
);

export { carsRoutes };
