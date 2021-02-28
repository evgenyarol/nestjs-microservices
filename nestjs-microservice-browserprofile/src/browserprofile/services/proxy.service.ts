import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proxy } from '../entities/proxy.entity';

@Injectable()
export class ProxyService {
    constructor(
        @InjectRepository(Proxy)
        private readonly proxyRepository: Repository<Proxy>
    ) {}

    async saveProxy(proxy: Proxy): Promise<Proxy> {
        return await this.proxyRepository.save({ ...proxy });
    }

    async getProxyById(id: number): Promise<Proxy> {
        const proxy = await this.proxyRepository.findOne({ where: { id } });
        if (!proxy) {
            return null
        } 
        return proxy
    }

    async updateProxyById(id : number, proxy: Proxy): Promise<any> {
        return await this.proxyRepository.update(id, proxy);
    }
}