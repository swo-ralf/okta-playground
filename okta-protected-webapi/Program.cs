using Okta.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = OktaDefaults.ApiAuthenticationScheme;
    options.DefaultChallengeScheme = OktaDefaults.ApiAuthenticationScheme;
    options.DefaultSignInScheme = OktaDefaults.ApiAuthenticationScheme;
}).AddOktaWebApi(new OktaWebApiOptions
{
    OktaDomain = builder.Configuration["Okta:OktaDomain"],
    AuthorizationServerId = builder.Configuration["Okta:AuthorizationServerId"],
    Audience = builder.Configuration["Okta:Audience"]
});
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Authorized", policy => policy.RequireAuthenticatedUser());
    options.DefaultPolicy = options.GetPolicy("Authorized")!;
    options.FallbackPolicy = options.GetPolicy("Authorized")!;
});

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", corsBuilder => corsBuilder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
