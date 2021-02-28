import { ManualFingerPrintService } from './services/manualfingerprint.service';
import { GeoService } from './services/geo.service';
import { FingerPrintService } from './services/fingerprint.service';
import { ProxyService } from './services/proxy.service';
import { CookieService } from './services/cookie.service';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrowserProfile } from './entities/browserprofile.entity';

@Injectable()
export class BrowserProfileService {
    constructor(
        @InjectRepository(BrowserProfile)
        private readonly browserProfileRepository: Repository<BrowserProfile>,
        private readonly cookieService: CookieService,
        private readonly proxyService: ProxyService,
        private readonly fingerPrintService: FingerPrintService,
        private readonly geoService: GeoService,
        private readonly manualFingerPrintService: ManualFingerPrintService,
    ) { }

    async saveBrowserProfile(browserProfile: BrowserProfile): Promise<any> {
        const saveBrowserProfile =  await this.browserProfileRepository.save({ ...browserProfile });
        const cookie = await this.cookieService.getCookieById(saveBrowserProfile.cookie_id)
        const proxy = await this.proxyService.getProxyById(saveBrowserProfile.proxy_id)
        const fingerPrint = await this.fingerPrintService.getFingerPrintById(saveBrowserProfile.fingerprint_id)
        const manualFingerPrint = await this.manualFingerPrintService.getManualFingerPrintById(saveBrowserProfile.manual_fingerprint_id)
        const geo = await this.geoService.getGeoById(saveBrowserProfile.geo_id)
        const data = {
            id: browserProfile.id,
            name: browserProfile.name,
            folder: browserProfile.folder,
            fingerprint_id: fingerPrint || null,
            cookie: cookie || null,
            proxy: proxy || null,
            manualFingerPrint: manualFingerPrint || null,
            geo: geo,
            removed: browserProfile.removed,
            start_url: browserProfile.start_url,
        }
        return data
    }

    async getBrowserProfileById(id: string): Promise<any> {
        const browserProfile = await this.browserProfileRepository.findOneOrFail({ where: { id } });
        const cookie = await this.cookieService.getCookieById(browserProfile.cookie_id)
        const proxy = await this.proxyService.getProxyById(browserProfile.proxy_id)
        const fingerPrint = await this.fingerPrintService.getFingerPrintById(browserProfile.fingerprint_id)
        const manualFingerPrint = await this.manualFingerPrintService.getManualFingerPrintById(browserProfile.manual_fingerprint_id)
        const geo = await this.geoService.getGeoById(browserProfile.geo_id)
        const data = {
            id: browserProfile.id,
            name: browserProfile.name,
            folder: browserProfile.folder,
            fingerprint_id: fingerPrint || null,
            cookie: cookie || null,
            proxy: proxy || null,
            manualFingerPrint: manualFingerPrint || null,
            geo: geo,
            removed: browserProfile.removed,
            start_url: browserProfile.start_url,
        }
        return data
    }

    async deleteBrowserProfile(id: number): Promise<any> {
        return this.browserProfileRepository.delete(id);
    }

}