import { Controller, UseGuards, Get, Post, Body, Request, Response, Put, Param, Delete } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Geo } from './entities/geo.entity';
import { Cookie } from './entities/cookie.entity';
import { Proxy } from './entities/proxy.entity';
import { BrowserProfile } from './entities/browserprofile.entity';
import { ManualFingerPrint } from './entities/manualfingerprint.entity';
import { FingerPrintService } from './services/fingerprint.service';
import { ManualFingerPrintService } from './services/manualfingerprint.service';
import { GeoService } from './services/geo.service';
import { CookieService } from './services/cookie.service';
import { ProxyService } from './services/proxy.service';
import { BrowserProfileService } from './browserprofile.service';


@Controller()
export class UserController {
  constructor(
    private readonly fingerPrintService: FingerPrintService,
    private readonly geoService: GeoService,
    private readonly cookieService: CookieService,
    private readonly proxyService: ProxyService,
    private readonly browserProfileService: BrowserProfileService,
    private readonly manualFingerPrintService: ManualFingerPrintService,
  ) { }

  // BrowserProfile
  @Get('browserprofile/:id')
  async getBrowserProfile(@Request() request) {
    const id = request.params.id
    return await this.browserProfileService.getBrowserProfileById(id)
  }

  @Post('browserprofile')
  async saveBrowserProfile(@Body() browserProfile: BrowserProfile) {
    return this.browserProfileService.saveBrowserProfile(browserProfile);
  }

  @Delete('browserprofile/:id')
  remove(@Param('id') id: number, @Response() response) {
    this.browserProfileService.deleteBrowserProfile(id);
    response.send('Deleted')
  }

  // ManualFingerPrint
  @Post('manualfingerprint')
  async saveManualFingerPrintService(@Body() manualFingerPrint: ManualFingerPrint) {
    return this.manualFingerPrintService.saveManualFingerPrint(manualFingerPrint);
  }

  @Put('manualfingerprint/:id')
  updateManualFingerPrint(@Param('id') id: number, @Body() manualFingerPrint: ManualFingerPrint, @Response() response) {
    this.manualFingerPrintService.updateManualFingerPrintById(+id, manualFingerPrint);
    response.send('Updated')
  }

  // Geo
  @Post('geo')
  async saveGeo(@Body() geo: Geo) {
    return this.geoService.saveGeo(geo);
  }

  @Put('geo/:id')
  updateGeo(@Param('id') id: number, @Body() geo: Geo, @Response() response) {
    this.geoService.updateGeoById(+id, geo);
    response.send('Updated')
  }

  @Get('generate/geo')
  async genGeo() {
    return this.geoService.genGeo();
  }

  // Cookie
  @Post('cookie')
  async saveCookie(@Body() cookie: Cookie) {
    return this.cookieService.saveCookie(cookie);
  }

  @Put('cookie/:id')
  updateCookie(@Param('id') id: number, @Body() cookie: Cookie, @Response() response) {
    this.cookieService.updateCookieById(+id, cookie);
    response.send('Updated')
  }

  // Proxy
  @Post('proxy')
  async saveProxy(@Body() proxy: Proxy) {
    return this.proxyService.saveProxy(proxy);
  }

  @Put('proxy/:id')
  updateProxy(@Param('id') id: number, @Body() proxy: Proxy, @Response() response) {
    this.proxyService.updateProxyById(+id, proxy);
    response.send('Updated')
  }

  // FingerPrint
  @Get('fingerprint')
  async getFingerprint(@Request() request) {
    const user_agent = request.query.user_agent
    const platform = request.query.platform
    const unmasked_render = request.query.unmasked_render
    const height = request.query.height
    const width = request.query.width
    return await this.fingerPrintService.getFingerPrint(user_agent, platform, height, width, unmasked_render)
  }
}