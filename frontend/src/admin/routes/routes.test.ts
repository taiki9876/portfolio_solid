import { resolvePath, route } from '@admin/routes/type';
import { RouteNames, RouteConfig } from '@admin/routes/routes';

test('test_route_指定したルートの情報を取得できること', () => {
    // 便宜上、homeでテストを行う
    const result = route(RouteNames.home);

    const homeConfig = RouteConfig[RouteNames.home];

    expect(result.path).toBe(homeConfig.path);
    expect(result.displayName).toBe(homeConfig.displayName);
    expect(result.page).toBe(homeConfig.page);
});

test('test_resolvePath_動的ルーティングを置き換えること', () => {
    // 便宜上、会員詳細でテストを行う
    const result = resolvePath(RouteNames.customerDetail, { customerCode: '12345' });

    expect(result).toBe('/admin/customers/12345');
});
