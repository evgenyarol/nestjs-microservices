import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FingerPrint } from '../entities/fingerprint.entity';

@Injectable()
export class FingerPrintService {
  constructor(
    @InjectRepository(FingerPrint)
    private readonly fingerPrintRepository: Repository<FingerPrint>
  ) { }

  async getFingerPrint(user_agent: string, platform: string, height: number, width: number, unmasked_render: string): Promise<FingerPrint> {
    const fingerPrint = await this.fingerPrintRepository.findOne({ where: { user_agent, platform, height, width, unmasked_render } });
    if (!fingerPrint) {
      return null
    }
    return fingerPrint
  }

  async getFingerPrintById(id: number): Promise<FingerPrint> {
    return await this.fingerPrintRepository.findOneOrFail({ where: { id } });
  }
}