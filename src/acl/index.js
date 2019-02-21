import {Acl, RedisStore} from '@aclify/aclify';
import RedisClient from '../lib/redis';

const acl = new Acl(new RedisStore(RedisClient));

const roles = {
  gestionnaire: 'gestionnaire',
};

export {acl as default, roles};
